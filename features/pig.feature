Feature: Pig's integration with Cucumber

  In order to integrate with the plain text testing framework
  As the Pig library
  I want to integrate successfully with Cucumber

  Background:
    Given a server is running
    And I am using a browser

  Scenario: Verifying static text in a page
    When I visit the homepage
    Then I should see "Is JavaScript Enabled?"

  Scenario: Verifying dynamic text in a page
    When I visit the homepage
    Then I should see "Yes"

  Scenario: Capturing a JavaScript alert
    When I pause standard out and execute "alert('Hello, world!');"
    Then I should see "ALERT: Hello, world!" when standard out is resumed

  Scenario: Capturing JavaScript console logging
    When I pause standard out and execute "console.log('Hello, Log!');"
    Then I should see "Hello, Log!" when standard out is resumed
    When I pause standard out and execute "console.info('Hello, Information!');"
    Then I should see "Hello, Information!" when standard out is resumed
    When I pause standard out and execute "console.warn('Hello, Warning!');"
    Then I should see "Hello, Warning!" when standard out is resumed
    When I pause standard out and execute "console.error('Hello, Error!');"
    Then I should see "Hello, Error!" when standard out is resumed
