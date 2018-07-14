(function(window){
	function TouchSim(ele){
		return TouchSim.prototype.init(ele);
	}
	Object.defineProperty(TouchSim.prototype,'constructor',{
		enumerable: false,
		value: TouchSim
	})
	TouchSim.prototype={
		init: function(ele){
			this.ele=ele;
			return this;
		},
		// 单机
		tap: function(handle){
			this.ele.addEventListener('touchstart',handle);
			this.ele.addEventListener('touchend',handle);
			var startTime,endTime;
			function touchFn(e){
				e.preventDefault();
				switch(e.type){
					case 'touchstart':
						startTime = new Date().getTime();
						break;
					case 'touchend':
						endTime = new Date().getTime();
						// 如果在500毫秒以内则属于单机
						if(endTime - startTime < 500){
							handle.call(this.e);
						}
						break;
				}
			}
		}
	}
	window.TouchSim = TouchSim;
})(window);