import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
// import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})

export class AccordionComponent implements OnInit {
  form: FormGroup;
  secondLevelValue: number;
  formConfig;
  panelOpenState = true;
  columns;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    let dataSrting1 =
      '[{"id":":company:office:","name":"bbgenerric(Office Level)","children":[{"id":":company:office:team:","name":"bbgenerric(Team Level)","children":[{"id":":company:office:team:userone:","name":"Dave Test Corp"}]}]},{"id":":company:office1:","name":"London(Office Level)","children":[{"id":":company:office:team1:","name":"Guiter(Team Level)","children":[{"id":":company:office:team:userone1:","name":"Bert Jansch"}]},{"id":":company:office:team2:","name":"Tech(Team Level)","children":[{"id":":company:office:team:userone2:","name":"Bert Jansch"},{"id":":company:office:team:userone3:","name":"Chris p "},{"id":":company:office:team:userone4:","name":"Dave Scott"},{"id":":company:office:team:userone5:","name":"Gaurav Kumar"}]}]}]';
    let dataSrting2 =
      '[{"id":":company:","name":"company Name","children":[{"id":":company:office:","name":"Office Name","children":[{"id":":company:office:team:","name":"Team Name","children":[{"id":":company:office:team:userone:","name":"User One"},{"id":":company:office:team:usertwo:","name":"User Two"}]}]},{"id":":company:office1:","name":"Office Name1","children":[{"id":":company:office:team1:","name":"Team Name1","children":[{"id":":company:office:team:userone1:","name":"User One1"},{"id":":company:office:team:usertwo1:","name":"User Two1"}]}]}]}]';
    let dataSrting3 =
      '[{"id":":company:office:","name":"bbgenerric(Office Level)","value":"10","children":[{"id":":company:office:team:","name":"bbgenerric(Team Level)","value":"12","childern":[{"id":":company:office:team:userone:","name":"Dave Test Corp"}]}]}]';

    this.formInit();
    this.formConfig = dataSrting1;
    this.formPatch();
    //  this.onChanges();
  }
  formInit() {
    this.form = this.fb.group({
      groups: this.fb.array([]),
    });
  }
  totalColumns(form: FormArray) {
    let columns = '[{"key":"budget","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"budget","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"spend","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"spend","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"spend","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"spend","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"spend","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}}]';
    let columns2 = '[{"key":"budget","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"spend","label":"£","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}},{"key":"Money","label":"$","value":"","type":"textbox","required":true,"order":1,"validator":{"limit":"4"}}]'
    const data = JSON.parse(columns);
    data.forEach(column => {
      form.push(this.createColumnForm(column));
    });
  }
  createColumnForm(column) {
    return this.fb.group({
      key: [column.key],
      label: [column.label],
      value: ['',[Validators.pattern('^[0-9]*$')]],
      type: [column.type],
      required: [column.required],
      order: [column.order],
    })
  }
  formPatch() {
    const data = JSON.parse(this.formConfig);
    data.forEach((firstLevel, topIndex: number) => {
      this.addTopLevelForm(firstLevel);
      if (firstLevel.children && firstLevel.children.length) {
        const group = this.form.get('groups') as FormArray;
        this.generateFormLevel(firstLevel, group, topIndex);
      }
    });
  //  this.form.get('groups').patchValue(data, { emitEvent: false });
  }
  generateFormLevel(data, form: FormArray, i: number) {   
    data.children.forEach((level, index) => {
      const childForm = this.addLevelDyanmically(form, i, level);
      if (level.children && level.children.length) {
        this.generateFormLevel(level, childForm, index);
      }
    });
  }
  addLevelDyanmically(form: FormArray, index: number, data) {
    const formArr = form.at(index).get('children') as FormArray;
    this.basicForm(formArr, data);
    return formArr;
  }
  basicForm(form: FormArray, data) {
    const formToAdd = this.fb.group(
      {
        name: [data.name],
        value: [''],
        type: ['text'],
        children: this.fb.array([]),
        columns: this.fb.array([])
      })
    this.totalColumns(formToAdd.get('columns') as FormArray);
    form.push(formToAdd);
  }
  onChanges(): void {
    this.form
      .get('groups')
      .valueChanges.pipe(debounceTime(500))
      .subscribe((val) => {
      //  this.restoreMaxValidation();
      });
  }
  onValueChanged(data) {
    console.log(data);
    const index = +data.groupIndex;
    const changedGroup = this.form.get('groups')['controls'][index];
 //   this.setChildrenMaxValue(changedGroup, +changedGroup.get('value'), true , 0);
    changedGroup.get('columns')['controls'].forEach((column: FormGroup, i: number) => {
      this.setChildrenMaxValue(changedGroup, +column.get('value').value, true , i);
    });
    // const farray = changedGroup.get('columns') as FormArray;
    // const obj = farray.at(0);
    // this.setChildrenMaxValue(changedGroup, +obj.get('value').value, true , 0);
  }
  // restoreMaxValidation() {
  //   this.form.get('groups')['controls'].forEach((element: FormGroup, index) => {
  //   //  this.setChildrenMaxValue(element, +element.get('value').value, true);
  //   });
  // }

  getValueAtVerticalIndex(farray: FormArray, index: number) {
    const obj = farray.at(index);
    return +obj.get('value').value;
  }
  setChildrenMaxValue(form: FormGroup, firstLevelValue: number, isSecond: boolean , verticalIndex: number) {
    if (form.get('children').value.length) {
      const parentValue = this.getValueAtVerticalIndex(form.get('columns') as FormArray, verticalIndex); 
      //parent form
      // child record
      form.get('children')['controls'].forEach((record: FormGroup) => {
        if (isSecond) {
          this.secondLevelValue = this.getValueAtVerticalIndex(record.get('columns') as FormArray, verticalIndex);
        }
        if (parentValue) {
          this.setMaxValue(record, verticalIndex , parentValue);
        } else if (this.secondLevelValue) {
          this.setMaxValue(record, verticalIndex , this.secondLevelValue);
        } else if (firstLevelValue) {
          this.setMaxValue(record, verticalIndex , firstLevelValue)
        } else {
          // record.get('value').clearValidators();
          // record.get('value').setValidators(Validators.pattern('^[0-9]*$'));
          // record.get('value').updateValueAndValidity({ emitEvent: false });
        }
        this.setChildrenMaxValue(record, firstLevelValue, false, verticalIndex);
      });
    }
  }
  setMaxValue(child: FormGroup, index: number, max) {
    const obj = child.get('columns') as FormArray;
    const current = obj.at(index);
    current.get('value').setValidators(Validators.max(max));
    current.get('value').updateValueAndValidity({ emitEvent: false });
  }

  addTopLevelForm(data) {
    const form = this.form.get('groups') as FormArray;
    const levelToAdd = this.createTopLevelForm(data);
    const formArray = <FormArray>this.form.get('groups');
    levelToAdd.get('groupIndex').patchValue(formArray.length);
    levelToAdd.valueChanges.pipe(debounceTime(200)).subscribe((data) => {
      this.onValueChanged(data);
    });
    form.push(levelToAdd);
    //  form.push(this.createTopLevelForm());
  }
  createTopLevelForm(data) {
    const form = this.fb.group({
      name: [data.name],
      value: ['', [Validators.pattern('^[0-9]*$')]],
      type: ['text'],
      groupIndex: '',
      children: this.fb.array([]),
      columns: this.fb.array([])
    });
    this.totalColumns(form.get('columns') as FormArray);
    return form;
  }
  formSubmit() {
    console.log(this.form.value);
  }
  public stopEvent(event) {
    event.stopPropagation();
  }
}
