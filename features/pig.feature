Feature: Pig's integration with Cucumber

  In order to integrate with the plain text testing framework
  As the Pig library
  I want to integrate successfully with Cucumber

  Background:
    Given I am using a browser

  Scenario: Simple text verification
    When I visit the homepage
    Then I should see "Is JavaScript Enabled?"
    And the browser is closed

  Scenario: Simple JavaScript verification
    When I visit the homepage
    Then I should see "Yes"
    And the browser is closed

  Scenario: Capturing alerts
    When standard out is paused
    And I execute "alert('Hello, world!');"
    Then I should see "ALERT: Hello, world!" when standard out is resumed
    And the browser is closed

  Scenario: Capturing console logging
    When standard out is paused
    And I execute "console.log('Hello, world!');"
    Then I should see "Hello, world!" when standard out is resumed
    When standard out is paused
    And I execute "console.info('The world is round.');"
    Then I should see "The world is round." when standard out is resumed
    When standard out is paused
    And I execute "console.warn('Danger!');"
    Then I should see "Danger!" when standard out is resumed
    When standard out is paused
    And I execute "console.error('Oh noes!');"
    Then I should see "Oh noes!" when standard out is resumed
    And the browser is closed
