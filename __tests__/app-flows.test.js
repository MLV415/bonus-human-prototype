import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react-native';

import App from '../App';

function openZuki() {
  fireEvent.press(screen.getByText('Pets'));
  fireEvent.press(screen.getByText('Zuki'));
}

function openRelationship() {
  openZuki();
  fireEvent.press(screen.getByText('Relationship'));
}

describe('Bonus Human core and iteration flows', () => {
  test('discovery renders Haley and Ari in Pet Owner mode', () => {
    render(<App />);
    expect(screen.getByText('Find their people.')).toBeTruthy();
    expect(screen.getByText('Pet Owner mode · viewing bonus humans')).toBeTruthy();
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
    expect(screen.queryByText('Mike + Zuki')).toBeNull();
    expect(screen.queryByText('Interested 0')).toBeNull();
    expect(screen.queryByText('Passed 0')).toBeNull();
  });

  test('a user can browse forward and backward without deciding', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Next →'));
    expect(screen.getByText('Jordan')).toBeTruthy();
    fireEvent.press(screen.getByText('← Previous'));
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
  });

  test('a user can open a person profile with grouped attributes and browse photos', () => {
    render(<App />);
    fireEvent.press(screen.getByText('View profile'));
    expect(screen.getByText('The practical fit')).toBeTruthy();
    expect(screen.getAllByText('Availability')).toHaveLength(2);
    expect(screen.getByText('Experience')).toBeTruthy();
    expect(screen.getByText('Home environment')).toBeTruthy();
    expect(screen.getByLabelText('Photo 1 of 2')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Next photo'));
    expect(screen.getByLabelText('Photo 2 of 2')).toBeTruthy();
    expect(screen.queryByText('Tap photo or use arrows to browse')).toBeNull();
  });

  test('an Interested decision can be revisited and undone from Matches', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Interested'));
    expect(screen.getByText('Undo interested')).toBeTruthy();
    fireEvent.press(screen.getByText('Matches'));
    fireEvent.press(screen.getByText('Interested 1'));
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
    fireEvent.press(screen.getByText('Undo interested'));
    expect(screen.getByText('No interested profiles yet')).toBeTruthy();
  });

  test('a Pass can be revisited and reconsidered from Matches', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Pass'));
    expect(screen.getByText('Reconsider pass')).toBeTruthy();
    fireEvent.press(screen.getByText('Matches'));
    fireEvent.press(screen.getByText('Passed 1'));
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
    fireEvent.press(screen.getByText('Reconsider pass'));
    expect(screen.getByText('No passed profiles yet')).toBeTruthy();
  });

  test('Discover filters support multiple schedule, experience, and home selections', () => {
    render(<App />);
    fireEvent.press(screen.getByText('⌁ Filters'));
    expect(screen.getByText('Distance / radius')).toBeTruthy();
    expect(screen.getByText('10 miles')).toBeTruthy();
    expect(screen.getByText('SCHEDULE')).toBeTruthy();
    expect(screen.getByText('EXPERIENCE')).toBeTruthy();
    expect(screen.getByText('HOME ENVIRONMENT')).toBeTruthy();
    expect(screen.getByText('Monday')).toBeTruthy();
    expect(screen.getByText('Sunday')).toBeTruthy();
    expect(screen.getByText('Injections / shots')).toBeTruthy();
    expect(screen.getByText('Has dogs')).toBeTruthy();
    expect(screen.getByText('Has cats')).toBeTruthy();

    const thursdayPm = screen.getByLabelText('Thursday PM');
    const saturdayPm = screen.getByLabelText('Saturday PM');
    fireEvent.press(thursdayPm);
    fireEvent.press(saturdayPm);
    fireEvent.press(screen.getByText('Senior dog care'));
    fireEvent.press(screen.getByText('Medication / pills'));
    fireEvent.press(screen.getByText('Apartment'));
    fireEvent.press(screen.getByText('No yard'));

    expect(thursdayPm.props.accessibilityState.selected).toBe(true);
    expect(saturdayPm.props.accessibilityState.selected).toBe(true);
    expect(screen.getByRole('button', { name: 'Senior dog care' }).props.accessibilityState.selected).toBe(true);
    expect(screen.getByRole('button', { name: 'Medication / pills' }).props.accessibilityState.selected).toBe(true);
    expect(screen.getByRole('button', { name: 'Apartment' }).props.accessibilityState.selected).toBe(true);
    expect(screen.getByRole('button', { name: 'No yard' }).props.accessibilityState.selected).toBe(true);
    fireEvent.press(screen.getByText('Show profiles'));
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
    expect(screen.getByText('1 of 1')).toBeTruthy();
  });

  test('Increase distance recovers directly from a no-results state', () => {
    render(<App />);
    fireEvent.press(screen.getByText('⌁ Filters'));
    fireEvent(screen.getByLabelText('Distance radius'), 'accessibilityAction', { nativeEvent: { actionName: 'decrement' } });
    expect(screen.getByLabelText('Distance radius').props.accessibilityValue.now).toBe(1);
    fireEvent.press(screen.getByText('Show profiles'));
    expect(screen.getByText('No profiles match these filters')).toBeTruthy();
    expect(screen.queryByText(/saved list/i)).toBeNull();
    fireEvent.press(screen.getByText('Increase distance'));
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
  });

  test('Clear filters resets every facet and restores the full role-appropriate list', () => {
    render(<App />);
    fireEvent.press(screen.getByText('⌁ Filters'));
    fireEvent.press(screen.getByText('Has dogs'));
    fireEvent.press(screen.getByText('Show profiles'));
    expect(screen.getByText('No profiles match these filters')).toBeTruthy();
    fireEvent.press(screen.getByText('Clear filters'));
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
    expect(screen.getByText('1 of 2')).toBeTruthy();
  });

  test('the compact Discover mode control switches user modes directly', () => {
    render(<App />);
    fireEvent.press(screen.getByLabelText('Switch mode. Currently Pet Owner mode'));
    expect(screen.getByText('Bonus Human mode · viewing pets & owners')).toBeTruthy();
    expect(screen.getByText('Mike + Zuki')).toBeTruthy();
  });

  test('the account mode toggle changes which profiles Discover shows', () => {
    render(<App />);
    fireEvent.press(screen.getByLabelText('Open account'));
    fireEvent.press(screen.getByText('Bonus Human mode'));
    fireEvent.press(screen.getByLabelText('Go back'));
    expect(screen.getByText('Bonus Human mode · viewing pets & owners')).toBeTruthy();
    expect(screen.getByText('Mike + Zuki')).toBeTruthy();
    expect(screen.queryByText('Haley & Ari')).toBeNull();
  });

  test('account profile edits and mocked photo management work locally', () => {
    render(<App />);
    fireEvent.press(screen.getByLabelText('Open account'));
    fireEvent.changeText(screen.getByLabelText('First name'), 'Michael');
    fireEvent.press(screen.getByText('Save profile'));
    expect(screen.getByText('Saved ✓')).toBeTruthy();
    fireEvent.press(screen.getByText('Add mocked photo'));
    expect(screen.getByText('Manage profile photos')).toBeTruthy();
  });

  test('Profile opens the development UI Gallery with interactive reference states', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Profile'));
    fireEvent.press(screen.getByText('UI Gallery (Dev)'));
    expect(screen.getByText('Typography & headers')).toBeTruthy();
    expect(screen.getByText('Primary action')).toBeTruthy();
    expect(screen.getByText('Destructive action')).toBeTruthy();
    expect(screen.getByText('Photo gallery treatment')).toBeTruthy();
    expect(screen.getByText('Pet & relationship cards')).toBeTruthy();
    expect(screen.getByText('Availability & confirmation')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Gallery reaction example'));
    expect(screen.getByText('You love this')).toBeTruthy();
    fireEvent.changeText(screen.getByLabelText('Gallery first name'), 'Michael');
    expect(screen.getByDisplayValue('Michael')).toBeTruthy();
  });

  test('Pets supports multiple pet associations and opens Zuki’s profile', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Pets'));
    expect(screen.getByText('PETS YOU OWN')).toBeTruthy();
    expect(screen.getByText('PETS YOU’RE A BONUS HUMAN FOR')).toBeTruthy();
    expect(screen.getByText('Zuki')).toBeTruthy();
    expect(screen.getByText('Mochi')).toBeTruthy();
    fireEvent.press(screen.getByText('Zuki'));
    expect(screen.getByText('16 years old · Chihuahua mix · 9 lbs')).toBeTruthy();
    expect(screen.getByText('Two daily medications')).toBeTruthy();
  });

  test('the relationship screen shows the current Regular Bonus Human stage', () => {
    render(<App />);
    openRelationship();
    expect(screen.getByText('Zuki’s trusted people')).toBeTruthy();
    expect(screen.getAllByText('Regular Bonus Human')).toHaveLength(2);
  });

  test('a bonus human can select the proposed Thursday care window', () => {
    render(<App />);
    openRelationship();
    fireEvent.press(screen.getByText('I’d like this time with Zuki'));
    expect(screen.getByText('Request sent to Mike')).toBeTruthy();
    expect(screen.getByText('Confirm as Mike')).toBeTruthy();
  });

  test('Mike can confirm the selected care window', () => {
    render(<App />);
    openRelationship();
    fireEvent.press(screen.getByText('I’d like this time with Zuki'));
    fireEvent.press(screen.getByText('Confirm as Mike'));
    expect(screen.getByText('Zuki time confirmed')).toBeTruthy();
    expect(screen.getByText('Thursday, 7:00–11:00 PM · Haley & Ari')).toBeTruthy();
  });

  test('care information is nested under the pet and relationship flow', () => {
    render(<App />);
    openRelationship();
    fireEvent.press(screen.getByText('View care info'));
    expect(screen.getByText('Relationship  ›  Zuki  ›  Care information')).toBeTruthy();
    expect(screen.getByText('Care checklist')).toBeTruthy();
    expect(screen.getByText('Medication')).toBeTruthy();
    expect(screen.getByText('Emergency contacts')).toBeTruthy();
    expect(screen.getByText('Rose City Veterinary Care', { exact: false })).toBeTruthy();
  });

  test('Matches opens a connection and sends a local message', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Matches'));
    expect(screen.getByText('Planning a meet & greet', { exact: false })).toBeTruthy();
    fireEvent.press(screen.getByText('Haley & Ari'));
    fireEvent.changeText(screen.getByPlaceholderText('Message Haley & Ari…'), 'Saturday afternoon works for us.');
    fireEvent.press(screen.getByText('Send'));
    expect(screen.getByText('Saturday afternoon works for us.')).toBeTruthy();
  });

  test('a user can create a new feed post', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Feed'));
    fireEvent.changeText(screen.getByPlaceholderText('Share a Zuki update…'), 'Zuki settled in with her tan blanket.');
    fireEvent.press(screen.getByText('↑'));
    expect(screen.getByText('Zuki settled in with her tan blanket.')).toBeTruthy();
    expect(screen.getByText('Just now')).toBeTruthy();
  });

  test('feed reactions can be removed and added again', () => {
    render(<App />);
    fireEvent.press(screen.getByText('Feed'));
    const haleyReaction = screen.getByLabelText("React to Haley's update");
    fireEvent.press(haleyReaction);
    expect(within(haleyReaction).getByText('1 person loves this')).toBeTruthy();
    fireEvent.press(haleyReaction);
    expect(within(haleyReaction).getByText('You and 1 other love this')).toBeTruthy();
  });
});
