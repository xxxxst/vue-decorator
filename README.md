# vue-decorator

typescript decorator for vue3 or high

[https://github.com/xxxxst/vue-decorator](https://github.com/xxxxst/vue-decorator)

# install
Using npm:

```
npm install --save-dev @xxxxst/vue-hook-webpack-plugin
npm install @xxxxst/vue-decorator
```

or using yarn:

```
yarn add @xxxxst/vue-hook-webpack-plugin --dev
yarn add @xxxxst/vue-decorator
```

# Useage

```ts
createStore({
    state: {
        stateVal: "state attribute"
        rootAttr: {
            childAttr: "state child atribute",
        }
    },
})

// @Comp(mapChildComp?: Record<string, Component>, options?: ComponentOptions)
@Comp({}, { template: '<div>{{propVal}}</div>' })
class ChildComponent extends Vue {
	@State() stateVal: string;
    @State("rootAttr.childAttr") childAttr: string;
    @State(`["rootAttr"].childAttr`) childAttr2: string;

    // Prop type is any : [Object, Array, String, Number, Boolean, Function]
	@Prop() propVal = "prop attribute, I'm default value";
	@Model() modelValue = "default model attribute";
    @Model() modelAaa = "model attribute named with 'modelAaa'";
    
    @Inject() provideVal;
    
    mounted() {
        this.stateVal = "update state value";
        this.modelValue = "update model value";
    }
}

@Comp({ ChildComponent, { template: '<ChildComponent :propVal="aaa" v-model="bbb" v-model:modelAaa="ccc"/>'} })
class ParentComponent {
    aaa = "";
    bbb = "";
    ccc = "";
    
	@Provide() provideVal = "provide attribute";
}
```

# Build

```
npm run build
```

# License

MIT

[LICENSE](./LICENSE)
