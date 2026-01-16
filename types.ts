
export enum AppStep {
  WELCOME = 'welcome',
  CAMERA = 'camera',
  PREVIEW = 'preview',
  SHARE = 'share',
  WIN = 'win'
}

export interface AppState {
  step: AppStep;
  capturedImage: string | null;
}
