Feature: Sign in


	  Scenario:
	  Given the following templates exist:
	  |title|description|
	  |thermo|EMC**2|
	  Given the following users exist:
	  |login|password|
	  |palerma|password|
	  And "palerma" has the following "thermo" activities:
	  |code|description|
	  |1234|7ºB|
	  And I am on the signin page
	  When I fill in "Login" with "palerma"
	  And I fill in "Password" with "password"
	  And I press "Sign in"
	  Then I should see "Palerma"
	  And I should see "código: 1234"
	  And I should see "7ºB"