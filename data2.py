import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import datetime

def splitData():
  data = pd.read_csv('./newfile.csv')

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

  X_train_df = pd.DataFrame(X_train.reshape(X_train.shape[0], -1))
  print("20 dòng cuối của tập X_train:")
  print(X_train_df.tail(20).to_string(index=False))

  X_test_df = pd.DataFrame(X_test.reshape(X_test.shape[0], -1))
  print("20 dòng cuối của tập X_test:")
  print(X_test_df.tail(20).to_string(index=False))

  return X_train, X_test, y_train, y_test, scaler, data

print(splitData())