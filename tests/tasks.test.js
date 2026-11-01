import test from "node:test";
import assert from "node:assert/strict";
import { createTask, updateTask, removeTask, filterTasks, STATUS } from "../src/tasks.js";
test("creates a task", () => { const t=createTask("  Demo  ", new Date("2026-01-01T00:00:00Z")); assert.equal(t.title,"Demo"); assert.equal(t.status,STATUS.ACTIVE); });
test("rejects empty titles", () => assert.throws(()=>createTask("   ")));
test("updates and removes tasks immutably", () => { const a=[{id:"1",title:"A",status:STATUS.ACTIVE}]; const b=updateTask(a,"1",{status:STATUS.DONE}); assert.equal(a[0].status,STATUS.ACTIVE); assert.equal(removeTask(b,"1").length,0); });
test("filters by search and status", () => { const a=[{id:"1",title:"Write docs",status:STATUS.ACTIVE},{id:"2",title:"Review code",status:STATUS.DONE}]; assert.equal(filterTasks(a,{search:"docs",status:"active"}).length,1); assert.equal(filterTasks(a,{status:"done"}).length,1); });
