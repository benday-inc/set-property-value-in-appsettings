"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const json_editor_1 = require("./json-editor");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
            core.debug(`Reading inputs...`);
            const name = core.getInput('name');
            core.debug(`Connection string name: ${name} ...`);
            const pathToSettingsFile = core.getInput('PATHTOSETTINGSFILE'.toLowerCase());
            core.debug(`Settings file: ${pathToSettingsFile} ...`);
            const valueToSet = core.getInput('valuetoset');
            core.debug(`Value to set: ${valueToSet} ...`);
            const keyname1 = core.getInput('keyname1');
            core.debug(`key name 1: ${keyname1} ...`);
            let keyname2 = core.getInput('keyname2');
            if (keyname2 === '') {
                keyname2 = null;
            }
            core.debug(`key name 2: ${keyname2} ...`);
            let keyname3 = core.getInput('keyname3');
            if (keyname3 === '') {
                keyname3 = null;
            }
            core.debug(`key name 3: ${keyname3} ...`);
            core.debug('Creating instance of json editor...');
            const editor = new json_editor_1.JsonEditor();
            core.debug('Json editor created.');
            core.debug('Opening file...');
            editor.open(pathToSettingsFile);
            core.debug('File opened.');
            core.debug('Setting property value value...');
            editor.setValue(valueToSet, keyname1, keyname2, keyname3);
            core.debug('Property value set.');
            core.debug('Saving changes...');
            editor.save(pathToSettingsFile);
            core.debug('Changes saved.');
        }
        catch (error) {
            if (error instanceof Error) {
                const err = error;
                core.error(err);
                core.setFailed(err);
            }
            else {
                core.error('Someting went wrong.');
                core.error(JSON.stringify(error));
                core.error(JSON.stringify(error));
                core.setFailed(JSON.stringify(error));
            }
        }
    });
}
run();
