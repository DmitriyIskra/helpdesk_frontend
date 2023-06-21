import ControlWidget from "./controlWidget";
import DrowUI from "./drowUI";
import Redrawing from "./redrawing";
import Http from "./http";
import moment from 'moment-timezone';

const widget = document.querySelector('.wr-widget');

const drowUI = new DrowUI(widget, moment, Http, Redrawing);

const controlWidget = new ControlWidget(drowUI);
controlWidget.init();