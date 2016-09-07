const os = require('os');
const cluster = require('cluster');
const cores = os.cpus().length;

if(cluster.isMaster){
  for(var i=0; i<cores;i++){
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id){
    console.log('I am running with ID:'+cluster.workers[id].process.pid);
  });

  cluster.on('exit', function(worker, code, signal){
    console.log('worker '+worker.process.pid+' died');
    cluster.fork();
  })
}else{
  require('./server');
}
