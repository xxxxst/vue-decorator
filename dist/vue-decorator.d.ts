import { Component, ComponentOptions } from 'vue';
import { VueConstructor, Vue } from 'vue-class-component';

declare function Comp(comps?: Record<string, Component>, options?: ComponentOptions): (target: VueConstructor<Vue>) => any;

declare function Inject(): (target: Vue, key: string) => void;

declare function Model(): (target: Vue, key: string) => void;

declare function Prop(): (target: Vue, key: string) => void;

declare function Provide(): (target: Vue, key: string) => void;

interface WathOption {
    name?: string;
    deep?: boolean;
    immediate?: boolean;
    flush?: "pre" | "post" | "sync";
}
declare const DEEP = 1;
declare const IMMEDIATE = 2;
declare function Watch(option?: WathOption | number): (target: Vue, key: string, descriptor: any) => void;

declare function State(attrName?: string): (target: Vue, key: string) => void;

export { Comp, DEEP, IMMEDIATE, Inject, Model, Prop, Provide, State, Watch };
