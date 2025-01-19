import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import datetime

def cleanData(df):
    print("Initial data information:")
    print(df.info())

    # Remove unnecessary columns (if there are columns named 'Unnamed')
    df = df.loc[:, ~df.columns.get_level_values(1).str.contains('^Unnamed')]

    # Handle the 'timestamp' column (if present)
    if ('timestamp', '') in df.columns:
        # Convert to datetime format
        df[('timestamp', '')] = pd.to_datetime(df[('timestamp', '')], errors='coerce')  
        
        # Remove rows with missing timestamp values
        df = df.dropna(subset=[('timestamp', '')]) 

    # Fill missing values using forward fill and backward fill methods
    df = df.fillna(method='ffill').fillna(method='bfill')

    # Normalize 'close' values between 0 and 1 if present
    if ('close', '') in df.columns:
        df[('close', '')] = (df[('close', '')] - df[('close', '')].min()) / (df[('close', '')].max() - df[('close', '')].min())

    # Print out the data after cleaning
    print("Data after cleaning:")
    print(df.head())

    return df

def fillData(df):
  # df = cleanData(df)
  # Create a new DataFrame with a complete range of dates and times
  complete_index = pd.date_range(start=df.index.min(), end=df.index.max(), freq='1min')

  complete_data = pd.DataFrame(index=complete_index)

  # Reindex the 'all_data' DataFrame with the complete index
  filledData = df.reindex(complete_data.index)

  # Reset the index to make 'Datetime' a column again
  filledData.reset_index(inplace=True)

  # Rename the 'Datetime' column to 'index'
  filledData.set_index('index', inplace=True)

  # Rename 'index' to 'Date' in the index
  filledData.index.name = 'Date'

  # replace nan values with mean of the before and after values for all columns
  filledData = filledData.fillna(filledData.shift() + filledData.shift(-1))/2)

  # Print the updated DataFrame
  return filledData

def updateData(filePath):
	df = pd.read_csv(filePath)
	# df = pd.read_csv('./stock_data/BTC_2010-2011.csv')

	# Convert the 'Date' column to the DataFrame index
	df['Date'] = pd.to_datetime(df['Date'])
	df.set_index('Date', inplace=True)

	# Get the end date of the data
	days_before = df.index[-1]
	days_before = days_before.date()

	# Get date time now and replace the time with 00:00:00
	current_date = datetime.date.today()

	# Create an empty DataFrame to store the data
	# all_data = pd.read_csv('stock_data/BTC_2010-2011.csv', index_col=0, header=[0, 1]).sort_index(axis=1)
	all_data = pd.DataFrame()

	# Loop through the range of dates
	for date in pd.date_range(days_before, current_date, freq='D'):
		# Define the start and end times for the data retrieval
		start_time = date.replace(hour=0, minute=0, second=0)
		end_time = date.replace(hour=23, minute=59, second=59)

		# Retrieve the data for the specified date range
		data = yf.download(
			tickers=['BTC-USD'],
			start=start_time,
			end=end_time,
			# period='1d',
			interval='1m'
		)

		# Flatten the column headers to remove the ticker
		if (isinstance(data.columns, pd.MultiIndex)):
				data.columns = [col[0] for col in data.columns]  # Retain only the first level

		# Append the data to the DataFrame
		all_data = pd.concat([all_data, data])
		
	# Update the `all_data` to include the new data
	new_data = pd.concat([df, all_data])

	# Remove any duplicate rows
	new_data = new_data[~new_data.index.duplicated(keep='first')]

	return fillData(new_data)

def splitData():
  data = pd.read_csv('./stock_data/BTC_2010-2011.csv')

  # Convert the 'Date' column to datetime and set it as the index
  data['Date'] = pd.to_datetime(data['Date'])
  data.set_index('Date', inplace=True)

  print("Columns in the data:", data.columns)

  scaler = MinMaxScaler()
  scaled_data = scaler.fit_transform(data)

  print("Columns in the data:", data.columns)

  print(data.describe())
  print("Number of NaN values in each column:")
  print(data.isnull().sum())
  print("Check for inf/-inf values:")
  print(data[data.isin([np.inf, -np.inf]).any(axis=1)])

  # Remove rows with NaN or inf values
  data = data.dropna()  # Drop rows containing NaN
  data = data.replace([np.inf, -np.inf], np.nan).dropna()  # Remove inf/-inf

  scaled_data = pd.DataFrame(scaled_data, columns=data.columns, index=data.index)

  # Time steps
  timesteps = 100

  X = []
  y = []

  close_index = data.columns.get_loc('Close')

  for i in range(timesteps, len(scaled_data)):
      X.append(scaled_data.iloc[i - timesteps:i].values)
      y.append(scaled_data.iloc[i, close_index])

  X = np.array(X)
  y = np.array(y)

  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

  return X_train, X_test, y_train, y_test, scaler, data

def main():
  new_data = updateData('./stock_data/BTC_2010-2011.csv')

  # draw the data
  new_data.plot(subplots=True)

  # Save the updated data to a CSV file
  new_data.to_csv('./stock_data/BTC_2010-2011.csv')

  return splitData()

if __name__ == '__main__':
  print(main())
