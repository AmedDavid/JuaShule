import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import ModeToggle from './mode-toggle';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/questions', label: 'Questions' },
  { to: '/resources', label: 'Resources' },
  { to: '/groups', label: 'Groups' },
];

const protectedLinks = [
  { to: '/questions', label: 'Questions' },
  { to: '/resources', label: 'Resources' },
  { to: '/groups', label: 'Groups' },
];

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav className="w-full bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-2 md:px-0">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition">JuaShule</Link>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 md:gap-4">
          <Link
            key="/"
            to="/"
            className={`px-3 py-1.5 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary/60
              ${isActive('/')
                ? 'bg-white/90 text-primary dark:bg-zinc-900/80 dark:text-accent-200 shadow'
                : 'hover:bg-white/30 hover:text-white/90 dark:hover:bg-zinc-900/40 dark:hover:text-accent-100 text-primary-foreground/90'}
            `}
          >
            Home
          </Link>
          {user && protectedLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary/60
                ${isActive(link.to)
                  ? 'bg-white/90 text-primary dark:bg-zinc-900/80 dark:text-accent-200 shadow'
                  : 'hover:bg-white/30 hover:text-white/90 dark:hover:bg-zinc-900/40 dark:hover:text-accent-100 text-primary-foreground/90'}
              `}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar>
                      <AvatarFallback className="bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 font-semibold">
                        {user.username ? user.username[0].toUpperCase() : '?'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary/60 hover:bg-white/30 hover:text-white/90 dark:hover:bg-zinc-900/40 dark:hover:text-accent-100 text-primary-foreground/90">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary/60 hover:bg-white/30 hover:text-white/90 dark:hover:bg-zinc-900/40 dark:hover:text-accent-100 text-primary-foreground/90">Signup</Link>
            </>
          )}
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>
        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-2">
          <div className="ml-1">
            <ModeToggle />
          </div>
          {user && (
            <div className="ml-1">
              <Avatar>
                <AvatarFallback className="bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 font-semibold">
                  {user.username ? user.username[0].toUpperCase() : '?'}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 p-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {user ? (
                <>
                  {protectedLinks.map(link => (
                    <DropdownMenuItem asChild key={link.to}>
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={isActive(link.to) ? 'font-semibold text-primary' : ''}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </>
              ) : null}
              <DropdownMenuItem asChild>
                <Link to="/" onClick={() => setMobileOpen(false)} className={isActive('/') ? 'font-semibold text-primary' : ''}>Home</Link>
              </DropdownMenuItem>
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-red-600 focus:text-red-700">
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup" onClick={() => setMobileOpen(false)}>Signup</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;