import os
import pandas as pd

folder_path = 'rides/'

duration_threshold = 10
distance_threshold = 10

combined_csv = pd.concat([pd.read_csv(os.path.join(folder_path, f)) for f in os.listdir(folder_path) if f.endswith('.csv')])

combined_csv = combined_csv.dropna()  
combined_csv = combined_csv[combined_csv['Duration (sec.)'].astype(int) >= duration_threshold] 
combined_csv = combined_csv[combined_csv['Covered distance (m)'].astype(int) >= distance_threshold]  

combined_csv = combined_csv.head(100)

combined_csv.to_csv(os.path.join(folder_path, 'combined.csv'), index=False)