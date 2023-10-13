import { bindable, inject, observable } from "aurelia";
import{ Formio } from 'formiojs';

declare global {
  interface String {
    /**
     * Checks if the provided string is null, undefined, or blank
     */
    isNullOrWhiteSpace(): boolean;
    /**
     * Checks if the provided string is a valid URL.
     */
    isValidUrl(): boolean;
    /**
     * Checks if the provided string is a valid JSON.
     */
    isValidJSON(): boolean;
  }
}

String.prototype.isNullOrWhiteSpace = function(): boolean {
  return this == null || this.trim() === '';
};

String.prototype.isValidJSON = function(): boolean {
  try {
    JSON.parse(this);
    return true;
  } catch (e) {
    return false;
  }
};
  
String.prototype.isValidUrl = function(): boolean {
  try {
    new URL(this);
    return true;
  } catch (error) {
    return false;
  }
}

@inject(Element)
export class FormioView {

  @bindable()
  public form;
  @bindable()
  public src: string | object;
  @bindable()
  public submission;
  private host: HTMLElement;

  constructor(private element: Element) {
    console.log(element);
  }

  private srcChanged(source) {
    this.loadForm(source);
  }

  attached() {
    let source: string | object; 
    this.loadForm(source);
  }  

  private loadForm(source: string | object) {
    if (typeof this.src === 'string' && !this.src.isNullOrWhiteSpace()) {
      try {
          if (this.src.isValidUrl()) {
              source = this.src;
              Formio.createForm(this.host, source, { base: '' }).then((form) => {
                form.nosubmit = true;
                this.form = form;
                form.on('change', this.onChange.bind(this));
              });
              return;
          }
      } catch (error) {
          //
      }
      try {
          source = JSON.parse(this.src);
          Formio.createForm(this.host, source).then((form) => {
            form.nosubmit = true;
            this.form = form;
            form.on('change', this.onChange.bind(this));
          });
          return;  
      } catch (error) {
          //
      }
  } else if (typeof this.src === 'object') {
      try {
          source = this.src;
          Formio.createForm(this.host, source).then((form) => {
            form.nosubmit = true;
            this.form = form;
            form.on('change', this.onChange.bind(this));
          });
          return;
      } catch (error) {
          //
      }
  }
  source = { 
      "components": [
          {
              "html": "<h2 style=\"text-align:center;\"><span style=\"font-family:'Courier New', Courier, monospace;\">The source must be valid URL address, json sting, or live Form.io form's model.</span></h2>",
              "label": "Content",
              "refreshOnChange": false,
              "key": "content",
              "type": "content",
              "input": false,
              "tableView": false
          }
      ]
  };
  Formio.createForm(this.host, source).then((form) => {
    form.nosubmit = true;
    this.form = form;
    form.on('change', this.onChange.bind(this));
  });
  }

  private onChange(changed) {
    console.log('Data was changed!', changed);      
    this.submission = JSON.stringify(changed.data);  

    const evt = new CustomEvent("change", {
      bubbles: true,
      detail: changed
    });

   
    this.element.dispatchEvent(evt);
   
  }
}
