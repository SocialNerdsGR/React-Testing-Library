import {renderHook, act} from '@testing-library/react-hooks';
import {useForm} from './useForm';

describe('useForm', () => {
  it('should return the default state', () => {
    const {result} = renderHook(() => useForm({email: 't@example.com', name: 'Thanos'}));
    expect(result.current.state).toMatchObject({email: 't@example.com', name: 'Thanos'});
  });

  it('should update field value', () => {
    const {result} = renderHook(() => useForm({email: 'email', name: 'name'}));
    act(() => {
      result.current.setValue({target: {value: 'another email', name: 'email'}});
    });

    expect(result.current.state).toMatchObject({email: 'another email', name: 'name'});
  });

  it('should reset form state', () => {
    const {result} = renderHook(() => useForm({email: 'email', name: 'name'}));
    act(() => {
      result.current.clearForm();
    });

    expect(result.current.state).toMatchObject({email: '', name: ''});
  });
})