import { Label } from "../../models/label.model";

export interface ILabelService {
  addLabel(name: string, description: string): void;
  updateLabel(name: string, description: string): void;
  showLabel(name: string): void;
  listAllLabels(): Promise<Label[]>;
  removeLabel(name: string): void;
}
