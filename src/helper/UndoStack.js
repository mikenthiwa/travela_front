class Stack {
  constructor(config) {
    this.past = [];
    this.future = [];
    this.defaultState = JSON.parse(JSON.stringify(config));
    this.current = JSON.parse(JSON.stringify(config));
    this.disableUndo = true;
    this.disableRedo = true;
  }
  
    checkUndoRedoStatus = () => {
      if (this.past.length === 0) {
        this.disableUndo = true;
        this.current = this.defaultState;
      } else {
        this.disableUndo = false;
      }
  
      if (this.future.length === 0) {
        this.disableRedo = true;
      } else {
        this.disableRedo = false;
      }
    };

    deepCopy = obj => JSON.parse(JSON.stringify(obj))
  
    save = value => {
      this.past.push(this.deepCopy(value));
      this.future = [];
      this.current = this.deepCopy(value);
      this.checkUndoRedoStatus();
    };
  
    undo = () => {
      const poppedValue = this.deepCopy(this.past.pop());
      this.future.push(poppedValue);
      this.current = this.past[this.past.length - 1];
      this.checkUndoRedoStatus();
      return this.current;
    };
  
    redo = () => {
      const poppedValue = this.deepCopy(this.future.pop());
      this.current = poppedValue;
      this.past.push(poppedValue);
      this.checkUndoRedoStatus();
      return this.current;
    };

    reset = () => {
      this.past = [];
      this.future = [];
      this.current = this.defaultState;
      this.disableUndo = true;
      this.disableRedo = true;
    }
}
  
export default Stack;
  
