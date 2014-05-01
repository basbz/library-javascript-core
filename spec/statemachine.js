define(['state-machine'], function (StateMachine) {
  describe("A State Machine", function () {
    it("can handle events", function () {
      var stm, spy = jasmine.createSpy('handleEvent');

      stm = StateMachine.create({
        idle: {
          foo: spy
        }
      });

      stm.setState('idle');
      stm.handleEvent('foo');
      expect(spy).toHaveBeenCalled();
    });

    it("can emit events", function () {
      var stm, spy = jasmine.createSpy('emitEvent');

      stm = StateMachine.create({}, {}, {fire: spy});
      stm.setState('idle');
      expect(spy).toHaveBeenCalledWith('change:state', 'idle');
      stm.setState('staringAtTheSun');
      expect(spy).toHaveBeenCalledWith('change:state', 'staringAtTheSun');
    });
  });
});
