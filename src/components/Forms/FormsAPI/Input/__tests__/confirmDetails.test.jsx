import React from 'react';
import InputRenderer from '../confirmDetails';
import * as formMetadata from '../../../FormsMetadata/NewRequestFormMetadata';

const RenderInputDetails = new InputRenderer(formMetadata);

describe('InputRenderer', () => {
  it('sets department data-parent-id as the value of the parentId property of the prop', () => {
    const spy = jest.spyOn(RenderInputDetails, 'createInput');
    const result = RenderInputDetails.renderInput('department', 'filter-dropdown-select', { parentid: 2 });
    expect(spy).toHaveBeenCalled();
    expect(result.props).toHaveProperty('parentid');
    expect(result.props.parentid).toEqual(2);
    spy.mockRestore();
  });
  it('sets department data-parent-id as the value of the parentId without property prop', () => {
    const spy = jest.spyOn(RenderInputDetails, 'createInput');
    const result = RenderInputDetails.renderInput('department', 'filter-dropdown-select');
    expect(spy).toHaveBeenCalled();
    expect(result.props).not.toHaveProperty('parentid');
    spy.mockRestore();
  });
  it('sets role data-parent-id as the value of the parentId property of the prop', () => {
    const spy = jest.spyOn(RenderInputDetails, 'createInput');
    const result = RenderInputDetails.renderInput('role', 'filter-dropdown-select', { parentid: 2 });
    expect(spy).toHaveBeenCalled();
    expect(result.props).toHaveProperty('parentid');
    expect(result.props.parentid).toEqual(2);
    spy.mockRestore();
  });
  it('sets role data-parent-id as the value of the parentId without property prop', () => {
    const spy = jest.spyOn(RenderInputDetails, 'createInput');
    const result = RenderInputDetails.renderInput('role', 'filter-dropdown-select');
    expect(spy).toHaveBeenCalled();
    expect(result.props).not.toHaveProperty('parentid');
    spy.mockRestore();
  });
  it('sets gender data-parent-id as the value of the parentId property of the prop', () => {
    const spy = jest.spyOn(RenderInputDetails, 'createInput');
    const result = RenderInputDetails.renderInput('gender', 'onboarding-button-toggler', { parentid: 2 });
    expect(spy).toHaveBeenCalled();
    expect(result.props).toHaveProperty('parentid');
    expect(result.props.parentid).toEqual(2);
    spy.mockRestore();
  });
  it('sets gender data-parent-id as the value of the parentId without property prop', () => {
    const spy = jest.spyOn(RenderInputDetails, 'createInput');
    const result = RenderInputDetails.renderInput('gender', 'onboarding-button-toggler');
    expect(spy).toHaveBeenCalled();
    expect(result.props).not.toHaveProperty('parentid');
    spy.mockRestore();
  });
  it('sets gender data-parent-id to nothing', () => {
    const spy = jest.spyOn(RenderInputDetails, 'createInput');
    const result = RenderInputDetails.renderInput('gender', '');
    expect(spy).toHaveBeenCalled();
    expect(result.props).not.toHaveProperty('');
    spy.mockRestore();
  });
});

