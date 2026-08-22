"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useUser, useClerk } from "@clerk/nextjs";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

export default function NavbarAuthControls({
  closeMenu,
  isUserMenuOpen,
  setIsUserMenuOpen,
  userMenuRef,
  onSignedInChange,
  desktopSignedInRef,
  mobileProfileRef,
  mobileFooterRef,
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const signedIn = isLoaded && isSignedIn;

  useEffect(() => {
    onSignedInChange(signedIn);
  }, [signedIn, onSignedInChange]);

  const closeUserMenu = () => setIsUserMenuOpen(false);

  const userInitial =
    (user?.firstName?.[0] || user?.username?.[0] || "U").toUpperCase();
  const userDisplayName =
    user?.fullName || user?.firstName || user?.username || "Account";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  const handleSignOut = async () => {
    closeUserMenu();
    closeMenu();
    try {
      await signOut({ redirectUrl: "/" });
    } catch {
      
    }
  };

  if (!signedIn) return null;

  const desktopMenu = desktopSignedInRef.current
    ? createPortal(
        <div className="relative hidden sm:block" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-black"
            aria-label="Open account menu"
            aria-haspopup="menu"
            aria-expanded={isUserMenuOpen}
          >
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt=""
                className="h-8 w-8 rounded-full object-cover ring-1 ring-black/10"
              />
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-[11px] font-bold uppercase text-white">
                {userInitial}
              </span>
            )}
          </button>

          <div
            role="menu"
            aria-label="Account menu"
            aria-hidden={!isUserMenuOpen}
            className={`absolute right-0 top-full z-50 mt-2 w-64 origin-top-right rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-all duration-200 ease-out motion-reduce:transition-none ${isUserMenuOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-95 opacity-0"
              }`}
          >
            <div className="border-b border-black/5 px-4 py-3">
              <p className="truncate text-[13px] font-semibold text-gray-900">
                {userDisplayName}
              </p>
              {userEmail && (
                <p className="truncate text-[11.5px] text-gray-500">
                  {userEmail}
                </p>
              )}
            </div>
            <div className="p-1.5">
              <button
                type="button"
                onClick={handleSignOut}
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-[12.5px] font-medium text-gray-800 transition-all duration-200 hover:bg-red-700 hover:text-white"
              >
                <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>,
        desktopSignedInRef.current,
      )
    : null;

  const mobileProfile = mobileProfileRef.current
    ? createPortal(
        <div className="flex shrink-0 items-center gap-3 px-5 pb-5">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold uppercase text-white">
              {userInitial}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-900">
              {userDisplayName}
            </p>
            {userEmail && (
              <p className="truncate text-xs text-neutral-500">{userEmail}</p>
            )}
          </div>
        </div>,
        mobileProfileRef.current,
      )
    : null;

  const mobileFooter = mobileFooterRef.current
    ? createPortal(
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 border border-neutral-200 py-3 text-xs font-medium tracking-wide text-neutral-900 transition-colors duration-200 hover:border-neutral-900"
        >
          <HiOutlineArrowRightOnRectangle className="h-4 w-4" aria-hidden />
          Log out
        </button>,
        mobileFooterRef.current,
      )
    : null;

  return (
    <>
      {desktopMenu}
      {mobileProfile}
      {mobileFooter}
    </>
  );
}
