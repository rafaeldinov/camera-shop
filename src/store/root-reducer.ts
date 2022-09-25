import { combineReducers } from '@reduxjs/toolkit';
import { cameraSlice } from './camera-reducer/camera-reducer';


export const rootReducer = combineReducers({
  'camera': cameraSlice.reducer
});
