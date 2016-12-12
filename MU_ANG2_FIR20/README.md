###README.md

Based on 'Creating My First Web App with Angular 2 in Eclipse' at https://www.genuitec.com/first-angular-2-app/

See also 'Angular 2 in Eclipse' at https://jaxenter.com/angular-2-intellij-netbeans-eclipse-128461.html

Angular 2 is a framework for building desktop and mobile web applications. After hearing rave reviews about Angular 2, I decided to check it out and take my first steps into modern web development. In this article, I�ll show you how to create a simple master-details application using Angular 2, TypeScript, Angular CLI and Eclipse Java EE.

#Tools and Prerequisites

- Angular IDE�Optionally install this IDE to automate setup of the development environment including Node, NPM, Angular CLI and TypeScript + Angular 2 intelligence.
(https://www.genuitec.com/products/angular-ide/)

- Node.js and NPM�You will need to install this open-source JavaScript runtime environment and its package manager. 
(http://blog.npmjs.org/post/85484771375/how-to-install-npm)

- Angular CLI�Install this handy command line interface for Angular.
(https://cli.angular.io/)

- JDK and Eclipse for Java EE Developers�The Java EE IDE and tools I used in this example.
(https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/neonr)

- TypeScript plugin for Eclipse�A typed superset of JavaScript that compiles to plain JavaScript.
(https://marketplace.eclipse.org/content/typescript)

- Terminal plugin for Eclipse�A fully working command-line Terminal inside Eclipse.
(https://marketplace.eclipse.org/content/tm-terminal)

- Basic TypeScript, HTML and Eclipse usage knowledge

NOTE: Try this TypeScript IDE for Eclipse instead: http://typecsdev.com/

##The Goal

Let�s create a simple app containing a vehicle list with the ability to edit vehicle properties. I�ve included a sample project that you can refer to. 

###Getting Started in Eclipse 

From the Eclipse menu, choose File>New>Dynamic Web Project; or right click in Project/Package Explorer and choose New>Dynamic Web Project.

Type 'MU_ANG2_FIR20' for the project name and click Finish�that�s all you need here.

###Angular CLI Comes to the Scene

Angular CLI is a command-line tool that allows you to create a working Angular 2 application out-of-the-box without a massive amount of manual work�and also allows you to generate Angular 2 components, services, etc. in the same way. Let�s try it! Right-click the newly created project and select Show in>Terminal.

From the Terminal view, type ```ng init```. After the process finishes, refresh the project in Eclipse�the src folder is updated with an app folder and several files; index.html (well-known to web developers) and main.ts among them. Is this really all that�s required to get an Angular 2 Hello World application? Yes! 

Open the project in Terminal view and type ```npm start```. After a short time, you�ll see output like:

```javascript
Serving on http://localhost:4200/
Build successful - 17270ms.
```

Open your browser (I use Chrome for testing) and type the given URL (http://localhost:4200/). You�ll see a �Loading�� message and then �App works!�. See, it actually works!

###Model

Let�s go ahead and create a model for our app. This model will be pretty simple. Create a package ```app.model``` in your src folder, and in it create file ```vehicle.ts``` with the following contents:

```javascript
export class Vehicle {
    id;
    name;
    type;
    mass;
}
```

The class contains only four fields describing some vehicle.

###Components

It�s time to make some UI bricks for our application, called components. Open the Terminal view for folder (Your Project)>Java Resources>src>app and type ng g component vehicle-list. The CLI command ng with the key g (or generate) is responsible for generating Angular 2 application entities and, particularly, components.

As you can conclude from its name, vehicle-list is responsible for displaying a list with vehicle details. Let�s expand vehicle-list folder and open vehicles-list.component.ts:

```javascript
import { Component, OnInit } from '@angular/core';
 
@Component({
  moduleId: module.id,
  selector: 'app-vehicles-list',
  templateUrl: 'vehicles-list.component.html',
  styleUrls: ['vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
 
  constructor() { }
 
  ngOnInit() {
  }
 
}
```

All the basic component infrastructure is present here.

- The first line is importing the ***Component*** decorator function. This function is describing metadata for any Angular 2 reusable UI component.

- ***Selector*** specifies the tag name that would trigger this component�s insertion.

- ***TemplateUrl*** and ***styleUrls*** specify file names that contain an html-based template for the component UI and css styling for it.

- ***Class VehiclesListComponent*** should contain almost all inner component logic written in TypeScript. For now it contains only an empty ***constructor*** and empty ***ngOnInit*** lifecycle hook. This hook can be useful for some �heavy� initialization like network or database calls, constructor should be used only for basic initialization, without any heavy IO.

OK, we�ll definitely need to store a list of our vehicles somewhere. Let�s add field vehicles: Vehicle[]; to the VehiclesListComponent class. Of course, Vehicle will be highlighted in red�currently, the TS compiler knows nothing about it. To fix this, add import { Vehicle } from '../model/vehicle'; to the imports section and save the file. The red highlighting should disappear. If not, make a small edit (like adding space) and save again�unfortunately, the current version of the TypeScript plugin has poor validation.

```javascript
...
import { Vehicle } from '../model/vehicle';
...
export class VehiclesListComponent implements OnInit {
 
  vehicles: Vehicle[];
  
  constructor() { }
 
  ngOnInit() {
  }
 
}
...
```

Well, now we have a vehicle list, but how can we interact with it? Passing it to the constructor would make our code less flexible by requiring a concrete list to be specified when creating a vehicle list component. There�s a better solution�Angular 2 supports ***Dependency Injection*** out-of-the-box, and it can be accomplished using Angular 2 Services.

Go to app.model in the terminal and type ```ng g service vehicle```. After the command executes, refresh app.model. Two files will be created, vehicle.service.spec.ts and vehicle.service.ts. The last one is interesting to us. For now we won�t implement any complex logic to obtain the list and will just hard code our vehicles list. In the following code we import the Injectable decorator, set up our list, assign given list to class field and return it by demand:

```javascript

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
import { Injectable } from '@angular/core';
 
var vehicles = [
	{
    	id:1,
    	name:"Trailer - 1",
    	type:"Truck",
    	mass:40
	},
	{
    	id:2,
    	name:"An-2",
    	type:"Plane",
    	mass:5
	},
	{
    	id:3,
    	name:"LandCruiser 80",
    	type:"Jeep",
    	mass:2
	},
];
 
    
 
@Injectable()
export class VehicleService {
 
	private vehicles;   
    
	constructor() {
    	this.vehicles = vehicles;
	}
 
	getVehicles() {
    	return this.vehicles;
	}    
 
}
```


.. continue reading the reference at the top of this README file, for more instructions.