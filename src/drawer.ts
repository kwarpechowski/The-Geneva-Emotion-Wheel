import { Config }  from "./config";
import { Line } from "./model/line";
import { Group } from "./model/group";
import { Circle } from "./model/circle";
import { DrawHelper } from "./helpers/DrawHelper";

export class Drawer {
  private mainElement: SVGGElement;
  private svg: SVGElement;

  constructor() {
    let container = document.getElementById(Config.element);
    this.svg = DrawHelper.createElement("svg");
    this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    this.svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    this.svg.setAttribute("version", "1.1");
    this.svg.setAttribute("class", "gew-instance");
    container.appendChild(this.svg);

    let g  = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", Config.classes.mainGroup);
    this.svg.appendChild(g);
    this.mainElement = g;
  }

  private drawLine(x1: number, y1: number, x2: number, y2: number): void {
    let line = DrawHelper.createElement("line");
    line.setAttribute("class", Config.classes.lineAxis);
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
    this.mainElement.appendChild(line);
  }

  private drawAxis(size: number): void {
    if (Config.showLines) {
      this.drawLine(size * -1, 0, Config.R * -1, 0);
      this.drawLine(Config.R, 0, size, 0);

      this.drawLine(0, size * -1, 0, Config.R * -1);
      this.drawLine(0, Config.R, 0 , size);
    }
  }

  private drawHeaders(): void {
    this.drawHeader(Config.R / 2 * -1, Config.headerTop);
    this.drawHeader(Config.R / 2, Config.headerBottom);
  }

  private drawHeader(y: number, txt: string): void {
    let el = DrawHelper.createElement("text");
    el.setAttribute("text-anchor", "middle");
    el.setAttribute("x", "0");
    el.setAttribute("y", y.toString());
    this.mainElement.appendChild(el);

    let textNode = document.createTextNode(txt);
    el.appendChild(textNode);
  }

  private setPosition(): void {
    let el = document.getElementsByClassName(Config.classes.mainGroup)[0];
    let width = el.getBoundingClientRect().width;
    let halfWidth = width / 2; // ladniej mozna policzyc rozmiar
    this.drawAxis(halfWidth);

    this.drawHeaders();

    el.setAttribute("style", `transform: translate(${halfWidth}px, ${halfWidth}px)`);

    this.svg.setAttribute("viewBox", `0 0 ${width} ${width}`);
  }

  run(): void {

    for (let i = 1; i <= Config.getElementsCount(); i++) {
      new Group(i);
    }

    this.setPosition();
  }

  circleClick(f: Function): void {
    Circle.clickEvents.push(f);
  }

  isAllChecked(f: Function): void {
    Group.isAllCheckedEvents.push(f);
  }
}
