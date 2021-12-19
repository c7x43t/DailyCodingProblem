function MarkovChain(startNode = null){
    this.chain = new Map();
    this.node = startNode;
    this.trackStates = false;
    this.states = null;
}
MarkovChain.prototype.addTransitionPropability = function(source,target,propability){
    if(!this.chain.has(source)) this.chain.set(source,new Map());
    let _source = this.chain.get(source);
    _source.set(target,propability);
}
MarkovChain.prototype.makeTransition = function(){
    if(this.trackStates && this.states === null){
        this.states = Object.fromEntries(Array.from(this.chain.keys()).map(e=>[e,0]))
    }
    var r = Math.random();
    var propabilities = this.chain.get(this.node).entries();
    var sProp = 0;
    for(var [targetNode, propability] of propabilities){
        sProp+=propability;
        if(r<sProp){
            this.node = targetNode;
            return;
        }
    }
    if(this.trackStates) this.states[this.node]++;
}
function createMarkovChain(data){
    let mc = new MarkovChain('a');
    mc.trackStates = true;
    for(let transition of data){
        mc.addTransitionPropability(...transition);
    }
    return mc;
}
// 
var data = [
  ['a', 'a', 0.9],
  ['a', 'b', 0.075],
  ['a', 'c', 0.025],
  ['b', 'a', 0.15],
  ['b', 'b', 0.8],
  ['b', 'c', 0.05],
  ['c', 'a', 0.25],
  ['c', 'b', 0.25],
  ['c', 'c', 0.5]
];
var mc = createMarkovChain(data);
mc.trackStates = true;
for(var i=0;i<5e3;i++) mc.makeTransition();
console.log(mc.states)
