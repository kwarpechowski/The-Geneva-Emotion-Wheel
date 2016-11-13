/// <reference path="../../typings/index.d.ts" />`
import "!style!css!less!./themes/core/theme.less";
import { Config }  from "./Config";
import { ConfigInterface } from "./interface/ConfigInterface";
import { Drawer }  from "./Drawer";

window["GEW"] = function (userConfig: ConfigInterface) {
  let config = new Config(userConfig);
  let drawer = new Drawer(config);
  drawer.run();
  return drawer;
};

