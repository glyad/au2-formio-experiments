import { all } from './all'

export class WelcomePage {
  public message = 'Welcome to Aurelia 2!';
  // public inst = all;
  public inst = {
    "components": [
        {
            "type": 'button',
            label: 'Submit',
            key: 'submit',
            disableOnInvalid: true,
            input: true,
            tableView: false
        }
    ]
  };

  
  public url = 'https://examples.form.io/example';
  // public source = JSON.stringify(this.inst, null, 4);
  public source = all;
  // public source = this.url;
  
  
}
