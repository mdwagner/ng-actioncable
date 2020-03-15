import angular from 'angular';
import 'angular-mocks';
import mod, { ActionCableService, Cable } from '../src';

describe('ActionCableService', () => {
  angular.mock.module.sharedInjector();

  beforeAll(angular.mock.module(mod.name));

  let service: ActionCableService;

  beforeAll(angular.mock.inject([
    ActionCableService.displayName,
    (actionCableService: ActionCableService) => {
      service = actionCableService;
    }
  ]))

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a new Cable', () => {
    const cable = service.cable('http://localhost:3000/test');
    expect(cable).toBeInstanceOf(Cable);
  });

  it('should remove cable when disconnected', () => {
    const url = 'http://localhost:3000/test';
    service.cable(url);
    expect(Object.keys((service as any).cables)).toHaveLength(1);
    service.disconnect(url);
    expect(Object.keys((service as any).cables)).toHaveLength(0);
  });
});
