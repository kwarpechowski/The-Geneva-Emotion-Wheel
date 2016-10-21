/// <reference path="../../types/svgjs.d.ts" />
import { Config }  from '../config';
import { Group }  from './group';

export class Circle {
  private element: svgjs.Element;
  private static mode: string = 'ellipse';

  constructor(group: Group, size: number, odstep: number, index: number) {

    this.element = group.element[Circle.mode](size, size);
    this.element.fill('yellow');

    //TODO KW bezposrednio do config
    this.element.center(group.config.R, group.config.R);


    let oy = Math.sin(group.getPosition());
    let ox = Math.cos(group.getPosition());

    this.element.dx(ox * (group.config.R + odstep));
    this.element.dy(oy * (group.config.R + odstep));

    this.element.click(() => {
      console.log('clicked', group.index, index);
    });

  }
}