import { Label } from "../../models/label.model";

export interface ILabelService {
  addLabel(label: Label): Promise<Label>;
  updateLabel(labelId: string, label: Label): Promise<Label>;
  showLabel(labelId: string): Promise<Label>;
  listAllLabels(): Promise<Label[]>;
  removeLabel(labelId: string): Promise<boolean>;
}
