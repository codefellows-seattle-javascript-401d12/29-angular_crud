'use strict';

require('./_editable-field.scss');

module.exports = {
  template: require('./editable-field.html'),
  controller: ['$log', EditableFieldController],
  controllerAs: 'editableFieldCtrl',
  bindings: {
    fieldValue: '<',
    fieldType: '@?',
    onUpdate: '&'
  }
};

function EditableFieldController($log) {
  $log.debug('EditableFieldController()');

  this.editMode = false;

  this.handleModeChange = function() {
    $log.debug('EditableFieldController.handleModeChange()');
    if(this.editMode) {
      this.onUpdate({ value: this.fieldValue });
      this.fieldValueCopy = this.fieldValue;
    }
    this.editMode = !this.editMode;
  };

  this.cancel = function() {
    $log.debug('EditableFieldController.cancel()');
    this.editMode = false;
    this.fieldValue = this.fieldValueCopy;
  };

  this.$onInit = function() {
    this.fieldValueCopy = this.fieldValue;
    if(!this.fieldType) {
      this.fieldType = 'text';
    }
  };
}
