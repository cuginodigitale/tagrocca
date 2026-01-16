
export enum AppStep {
  WELCOME = 'welcome',
  CAMERA = 'camera',
  PREVIEW = 'preview',
  WIN = 'win'
}

export interface AppState {
  step: AppStep;
  capturedImage: string | null;
}
