import ControlWidget from "./controlWidget";
import DrowUI from "./drowUI";
import Constructor from "./constructor";
import Http from "./http";
import moment from 'moment-timezone';

const widget = document.querySelector('.wr-widget');

const http = new Http();
const drowUI = new DrowUI(widget, moment, http);

const controlWidget = new ControlWidget(drowUI, http);
controlWidget.init();