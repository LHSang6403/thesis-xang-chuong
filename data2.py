import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import datetime
from torch.utils.data import TensorDataset, DataLoader
import torch

# Create a function to create sequences of 
def create_sequences(data, seq_length):
  X, y = [], []
  for i in range(len(data) - seq_length):
      X.append(data[i:i+seq_length])
      y.append(data[i+seq_length])
  return np.array(X), np.array(y)


def splitData():
  data = pd.read_csv('./newfile.csv')

  # Convert the 'Date' column to datetime and set it as the index
  data['Date'] = pd.to_datetime(data['Date'])
  data.set_index('Date', inplace=True)

  scaler = MinMaxScaler()
  scaled_data = scaler.fit_transform(data)

  # Remove rows with NaN or inf values
  data = data.dropna()  # Drop rows containing NaN
  data = data.replace([np.inf, -np.inf], np.nan).dropna()  # Remove inf/-inf

  scaled_data = pd.DataFrame(scaled_data, columns=data.columns, index=data.index)

  # train = data.loc['2024-11-18 14:30:00+00:00':'2024-12-12 19:40:00+00:00']
  # test = data.loc['2024-12-12 19:41:00+00:00':'2024-12-18 16:52:00+00:00']

  # train_scaled = scaler.fit_transform(train)
  # test_scaled = scaler.fit_transform(test)

  # # Create sequences with a length of 100
  # seq_length = 100
  # X_train, y_train = create_sequences(train_scaled, seq_length)
  # X_test, y_test = create_sequences(test_scaled, seq_length)

  # # Create data loaders
  # train_data = TensorDataset(torch.tensor(X_train).float(), torch.tensor(y_train).float())
  # test_data = TensorDataset(torch.tensor(X_test).float(), torch.from_numpy(y_test).float())

  # batch_size = 64
  # train_loader = DataLoader(train_data, shuffle=True, batch_size=batch_size)
  # test_loader = DataLoader(test_data, shuffle=False, batch_size=batch_size)


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

  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

  print(f"X_train shape: {X_train.shape}")
  print(f"y_train shape: {y_train.shape}")
  print(f"X_test shape: {X_test.shape}")
  print(f"y_test shape: {y_test.shape}")
  
  # for each in y_test:
  #   print(each)

  # print(f"train_loader: {len(train_loader)}")
  # print(f"test_loader: {len(test_loader)}")

  return X_train, X_test, y_train, y_test, scaler, data

splitData()