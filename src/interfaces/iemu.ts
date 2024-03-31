import { GraphicalType } from '../enums/graphical-type';

export interface IEmu {
  terminal?: URL;
  graphical?: URL;
  graphicalType?: GraphicalType;
  emulationId: string;
}
