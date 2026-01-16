
export enum AppStep {
  WELCOME = 'welcome',
  STEP1_CAMERA = 'step1_camera',
  STEP1_PREVIEW = 'step1_preview',
  STEP2_TAGS = 'step2_tags',
  STEP3_SHARE = 'step3_share',
  WIN = 'win'
}

export interface AppState {
  step: AppStep;
  capturedImage: string | null;
}
