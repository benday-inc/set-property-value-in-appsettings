"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const JsonEditor_1 = require("./JsonEditor");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
            core.debug(`Reading inputs...`);
            const name = core.getInput('name');
            core.debug(`Connection string name: ${name} ...`);
            const pathToSettingsFile = core.getInput('PATHTOSETTINGSFILE'.toLowerCase());
            core.debug(`Settings file: ${pathToSettingsFile} ...`);
            const connStringValue = core.getInput('connectionstring');
            core.debug(`Connection string value: ${connStringValue} ...`);
            core.debug('Creating instance of json editor...');
            const editor = new JsonEditor_1.JsonEditor();
            core.debug('Json editor created.');
            core.debug('Opening file...');
            editor.open(pathToSettingsFile);
            core.debug('File opened.');
            core.debug('Setting connection string value...');
            editor.setConnectionString(name, connStringValue);
            core.debug('Connection string value set.');
            core.debug('Saving changes...');
            editor.save(pathToSettingsFile);
            core.debug('Changes saved.');
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
