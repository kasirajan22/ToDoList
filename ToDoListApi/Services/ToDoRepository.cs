using System.Collections.Generic;
using System.Linq;
using ToDoListApi.Models;

namespace ToDoListApi.Services
{
    public interface IToDoRepository
    {
        IEnumerable<ToDoItem> GetAll();
        ToDoItem? Get(int id);
        ToDoItem Create(ToDoItem item);
        void Update(int id, ToDoItem item);
        void Delete(int id);
    }

    public class ToDoRepository : IToDoRepository
    {
        private readonly AppDbContext _context;
        public ToDoRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<ToDoItem> GetAll() => _context.ToDoItems.ToList();
        public ToDoItem? Get(int id)
        {
            return _context.ToDoItems.Find(id);
        }

        public ToDoItem Create(ToDoItem item)
        {
            _context.ToDoItems.Add(item);
            _context.SaveChanges();
            return item;
        }
        public void Update(int id, ToDoItem item)
        {
            var existing = _context.ToDoItems.Find(id);
            if (existing == null) return;
            existing.Title = item.Title;
            existing.IsCompleted = item.IsCompleted;
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var item = _context.ToDoItems.Find(id);
            if (item == null) return;
            _context.ToDoItems.Remove(item);
            _context.SaveChanges();
        }
    }
}
