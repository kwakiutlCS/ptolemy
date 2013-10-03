Feature: Sign in


	  Scenario:
	  Given the following users exist:
	  |name|password|
	  |palerma|password|
	  And I am on the signin page
	  When I fill in "Name" with "palerma"
	  And I fill in "Password" with "password"
	  And I press "Sign in"
	  Then I should see "Palerma"