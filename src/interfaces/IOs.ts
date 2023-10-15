import {IPhoto} from './IPhoto';

export interface IOs {
  id: string;
  name: string;
  version: string
  vendor: string;
  shortDescription: string;
  fullDescription: string;
  terminalEnable: boolean;
  graphicsEnable: boolean;
  mainPhoto: URL;
  photos?: IPhoto[];
  parentId?: string[];
  childId?: string[];
  isFree: boolean;
  canDownloadedRaw: boolean;
}
