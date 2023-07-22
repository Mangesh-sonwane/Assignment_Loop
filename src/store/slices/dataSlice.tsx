import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Papa, { ParseResult } from 'papaparse';

interface DataRow {
  number: string;
  mod3: string;
  mod4: string;
  mod5: string;
  mod6: string;
}

interface DataState {
  data: DataRow[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: { [key in keyof DataRow]?: string[] };
}

const initialState: DataState = {
  data: [],
  status: 'idle',
  error: null,
  filters: {},
};

export const fetchData = createAsyncThunk<DataRow[], void>(
  'data/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/dataset_small.csv');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      const parsedData: ParseResult<DataRow> = Papa.parse<DataRow>(text, {
        header: true,
      });
      return parsedData.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching CSV data');
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFilterValues: (
      state,
      action: PayloadAction<{ column: keyof DataRow; values: string[] }>
    ) => {
      const { column, values } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [column]: values,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setFilterValues } = dataSlice.actions;

export default dataSlice.reducer;
