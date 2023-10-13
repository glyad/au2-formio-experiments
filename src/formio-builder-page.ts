import { bindable, observable } from "aurelia";
import { FormBuilder } from "formiojs";

export class FormioBuilderPage {
  public jsonElement;
  @bindable()
  public builderInstance;
  @bindable()
  public form;
  @bindable()
  public source = {};

  //@observable()
  @bindable()
  public submission;
  
  public formioview;


  submissionChanged(submission) {
    console.log('submissionChanged: ', submission);
  }

  attached() {
    (new FormBuilder(document.getElementById('builder'), {         
    }, {
      display: 'form',
      showFullJsonSchema: true,
    })).ready.then((builderInstance) => {
      this.builderInstance = builderInstance;
      this.source = this.builderInstance.schema;
      builderInstance.on('change', this.onChange.bind(this));
    });

    //this.submission = this.formioview.submission;
    //document.addEventListener('formioview', this.formioChanged.bind(this));
    
  } 

  private onChange(form) {
    this.source = this.builderInstance.schema;
  }

  private formioChanged(evt) {
    //this.submission = this.formioview.submission;
  }

}
   
  