import { bindable, customElement, inject } from "aurelia";
import SignaturePad from "signature_pad";

@customElement({
  name: 'signature-pad', 
  template: "<canvas></canvas>"})
  @inject(Element)
  export class SignaturePadComponent {

    private _signaturePad: SignaturePad;
    private _data: string;

    constructor(private element: Element) {}

    @bindable()
    public get empty(): boolean {
      return this._signaturePad.isEmpty();
    }

    @bindable()
    public get data() {
      return this._data;
    }
    private set data(value: string) {
      this._data = value;
    }
    attached() {

      
      console.log(this.element);

      const canvas = <HTMLCanvasElement>this.element.firstElementChild;
      canvas.style.maxWidth = "100%";
      canvas.style.maxHeight = "155px";

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      
      const signaturePad = new SignaturePad(<HTMLCanvasElement>this.element.firstElementChild, {
        
        minWidth: 1,
        maxWidth: 2,
        penColor: "rgb(66, 133, 200)",
        dotSize: 1,
        backgroundColor: "wheat",
        
      });

      signaturePad.addEventListener("beginStroke", () => {
        console.log("Signature started");
      }, { once: true });

      signaturePad.addEventListener("endStroke", ()=> {
        // Save
        this.data = signaturePad.toSVG({ includeBackgroundColor: false });
        console.log(this.data);
      }, {});

      //window.addEventListener("resize", SignaturePadComponent.resizeCanvas);

      SignaturePadComponent.resizeCanvas(<HTMLCanvasElement>this.element.firstElementChild, signaturePad);

      this._signaturePad = signaturePad;
    }

    detached() {
      //
    }

    private static resizeCanvas(canvas: HTMLCanvasElement, signaturePad: SignaturePad): void {
      const ratio =  Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }
    
}

