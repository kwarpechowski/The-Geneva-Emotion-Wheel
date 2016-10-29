import "!style!css!less!./themes/core/theme.less";
import "!style!css!less!./themes/rainbow/theme.less";

import { Config }  from "./config";
import { ConfigInterface } from "./interface/ConfigInterface";
import { Drawer }  from "./drawer";

window["GEW"] = function (userConfig: ConfigInterface) {
  let config = new Config(userConfig);
  let drawer = new Drawer(config);
  drawer.run();
  return drawer;
};

