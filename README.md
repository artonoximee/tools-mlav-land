# Tools for MLAV.LAND

## Introduction

This app aims at bringing tools for administrative work, such as, creating invoices and quotes, counting the time spent on working on projects, transferring files and storing them, documentation, ...

It is a React App, built with Firebase as back-end. Currently in active development. 

## Versions
### 0.1.0
- Initial version, setting up files, folders, components, routes, etc.

### 0.1.1
- Implementation of the invoices system with the following features:
	- List all invoices
	- Create an invoice
	- Add a variable number of products to an invoice
	- Delete an invoice

### 0.1.2
- Implementation of the project system with the following features:
	- List all projects
	- Create a project
	- Delete a project

### 0.1.3
- Implementation of the time counter system
	- List the counters by project
	- Create a counter
- Add an acronym in the project to identify the project with a short word

### 0.1.4
- Adding functions for the time counter
	- Access the list of counter instances per project
	- Delete a counter instance
	- Add a counter by a modal (instead of a new page)
	- Preselect project when adding a counter in the counter show component
- Adding functions for projects
	- Add a project by a modal (instead of a new page)
	- Update the title and acronym of a project

## Dependencies

This app is built on :
- reactJS
- react-router-dom
- firebase + uuid
- bootstrap + jquery
- react-hook-forms
- recharts


## Live version

An online version of this app is [available here](https://tools.mlav.land/).