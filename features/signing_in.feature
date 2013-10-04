Feature: Sign in


	  Scenario:
	  Given the following users exist:
	  |name|password|
	  |palerma|password|
	  And "palerma" has the following activities:
	  |code|template_id|title|description|
	  |1234|1|thermo stuff|7ºB|
	  And I am on the signin page
	  When I fill in "Name" with "palerma"
	  And I fill in "Password" with "password"
	  And I press "Sign in"
	  Then I should see "Palerma"
	  And I should see "thermo stuff"
	  And I should see "código: 1234"
	  And I should see "7ºB"