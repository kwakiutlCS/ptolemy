Feature: create activity
	  In order to let activities be available to students
	  As a teacher 
	  I want to create one from a template


	  Scenario: 
	  Given the following templates exist:
	  |url|title|description|
	  |/thermo|thermo|my thermo|
	  Given the following users exist:
	  |login|password|
	  |palerma|password|
	  And I am signed in as "palerma"
	  And I am on the templates page
	  When I follow "thermo"
	  Then I should see "thermo"
	  Then I should see "Criar"
	  Then I should see "Limite"
	  And I should see "Código"
	  