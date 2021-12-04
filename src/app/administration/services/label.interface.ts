export interface ILabelService {
  addLabel(name: string, description: string): void;
  updateLabel(name: string, description: string): void;
  showLabel(name: string): void;
  listAllLabels(): void;
  removeLabel(name: string): void;
}
