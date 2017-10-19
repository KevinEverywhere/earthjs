// https://bl.ocks.org/mbostock/2b85250396c17a79155302f91ec21224
// https://bl.ocks.org/pbogden/2f8d2409f1b3746a1c90305a1a80d183
// http://www.svgdiscovery.com/ThreeJS/Examples/17_three.js-D3-graticule.htm
// https://stackoverflow.com/questions/22028288/how-to-optimize-rendering-of-many-spheregeometry-in-three-js
// https://threejs.org/docs/#api/materials/PointsMaterial
export default function (urlJson) {
    /*eslint no-console: 0 */
    var _ = {
        dataDots: null,
        onHover: {},
        onHoverVals: [],
};

    function init() {
        this._.options.showDots = true;
    }

    function createDot(feature) {
        var tj = this.threejsPlugin,
        material = new THREE.MeshBasicMaterial({
            color: feature.geometry.color || 0xC19999, //F0C400,
            side: THREE.DoubleSide,
            transparent: true,
            depthWrite: false,
            depthTest: true,
            opacity: 0.5,
        }),
        radius   = (feature.geometry.radius || 0.5) * 10,
        geometry = new THREE.CircleBufferGeometry(radius, 25),
        mesh     = new THREE.Mesh(geometry, material),
        position = tj.vertex(feature.geometry.coordinates);
        mesh.position.set(position.x, position.y, position.z);
        mesh.lookAt({x:0,y:0,z:0});
        return mesh;
    }

    function hover(event){
        for (var i = 0, list = _.onHoverVals; i < list.length; i += 1) {
            var v = list[i];

            v.call(event.target, event);
        }
    }

    function create() {
        var this$1 = this;

        var tj = this.threejsPlugin;
        if (!_.sphereObject) {
            _.sphereObject = new THREE.Group();
            _.sphereObject.name = _.me.name;
            _.dataDots.features.forEach(function (d) {
                var dot = createDot.call(this$1, d);
                dot.__data__ = d;
                _.sphereObject.add(dot);
                if (tj.domEvents) {
                    tj.domEvents.addEventListener(dot, 'mousemove', hover, false);
                }
            });
        }
        tj.addGroup(_.sphereObject);
    }

    return {
        name: 'dotsThreejs',
        urls: urlJson && [urlJson],
        onReady: function onReady(err, data) {
            _.me.data(data);
        },
        onInit: function onInit(me) {
            _.me = me;
            init.call(this);
        },
        onCreate: function onCreate() {
            create.call(this);
        },
        data: function data(data$1) {
            if (data$1) {
                _.dataDots = data$1;
            } else {
                return _.dataDots;
            }
        },
        onHover: function onHover(obj) {
            Object.assign(_.onHover, obj);
            _.onHoverVals = Object.keys(_.onHover).map(function (k) { return _.onHover[k]; });
        },
        sphere: function sphere() {
            return _.sphereObject;
        },
        // color(c) {
        //     material.color.set(c);
        //     material.needsUpdate = true;
        //     this.threejsPlugin.renderThree();
        // }
    }
}
