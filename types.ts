
export enum AppStep {
  WELCOME = 'welcome',
  SCAN = 'scan',
  CAMERA = 'camera',
  PREVIEW = 'preview',
  SHARE = 'share',
  WIN = 'win'
}

export interface AppState {
  step: AppStep;
  capturedImage: string | null;
  scannedTags: string;
}
