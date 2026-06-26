/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getUsersByFlat, updateUserStatus } from "../../api";
import { useAuth } from "../Auth/AuthContext";
import type { User } from "../../types";
import Toast from "../common/Toast";

export default function MembersPage() {
  const { user: currentUser } = useAuth();
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (!currentUser?.flatId) {
      setLoading(false);
      return;
    }

    getUsersByFlat(currentUser.flatId)
      .then(setMembers)
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, [currentUser]);

  const toggleStatus = async (member: User) => {
    if (currentUser?.role !== "ADMIN") return;
    const newStatus = member.status === "ACTIVE" ? "OOF" : "ACTIVE";
    try {
      const updated = await updateUserStatus(member._id, newStatus);
      setMembers((current) => current.map((item) => (item._id === updated._id ? updated : item)));
      setToast({ message: `${member.name} is now ${newStatus}`, type: "success" });
    } catch (error) {
      setToast({ message: (error as Error).message, type: "error" });
    }
  };

  const isAdmin = currentUser?.role === "ADMIN";
  const active = members.filter((member) => member.status === "ACTIVE");
  const oof = members.filter((member) => member.status === "OOF");

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Members</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-[#AEB5FF]">{members.length} people in this flat. Round-robin assigns to active members only.</p>
      </header>

      <section className="mb-7 rounded-lg border border-indigo-100 bg-indigo-50 px-5 py-4 dark:border-[#2D35D4]/40 dark:bg-[#1A1F8C]/70">
        <p className="text-sm font-bold text-indigo-950 dark:text-white">Round-robin order</p>
        <p className="mt-1 text-sm text-indigo-900 dark:text-[#DDE2FF]">Tasks go to the active member with the oldest last assigned date. OOF members are skipped.</p>
      </section>

      {loading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500 dark:border-[#2D35D4]/30 dark:bg-[#101450] dark:text-[#AEB5FF]">Loading members...</div>
      ) : members.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center font-bold text-slate-950 dark:border-[#2D35D4]/40 dark:bg-[#101450] dark:text-white">No members yet</div>
      ) : (
        <div className="space-y-8">
          <MemberSection title={`Active (${active.length})`}>
            {active.map((member) => (
              <MemberRow
                key={member._id}
                member={member}
                isCurrentUser={member._id === currentUser?._id}
                canToggle={isAdmin && member._id !== currentUser?._id}
                onToggle={toggleStatus}
              />
            ))}
          </MemberSection>

          {oof.length > 0 && (
            <MemberSection title={`Out of flat (${oof.length})`}>
              {oof.map((member) => (
                <MemberRow
                  key={member._id}
                  member={member}
                  isCurrentUser={member._id === currentUser?._id}
                  canToggle={isAdmin}
                  onToggle={toggleStatus}
                />
              ))}
            </MemberSection>
          )}
        </div>
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}

function MemberSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-black uppercase tracking-wide text-slate-500 dark:text-[#87CEEB]">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

interface MemberRowProps {
  member: User;
  isCurrentUser: boolean;
  canToggle: boolean;
  onToggle: (member: User) => void;
}

function MemberRow({ member, isCurrentUser, canToggle, onToggle }: MemberRowProps) {
  const lastAssigned = member.lastAssignedAt
    ? new Date(member.lastAssignedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    : "Never";

  return (
    <article className={`flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2D35D4]/30 dark:bg-[#101450] ${member.status === "OOF" ? "opacity-70" : ""}`}>
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${member.status === "OOF" ? "bg-slate-200 text-slate-500 dark:bg-[#0D0F3C] dark:text-[#6B75D4]" : "bg-[#2D35D4] text-white"}`}>
        {member.name[0]?.toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-bold text-slate-950 dark:text-white">{member.name}</p>
          {isCurrentUser && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 dark:bg-[#1A1F8C] dark:text-[#87CEEB]">You</span>}
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600 dark:bg-[#0D0F3C] dark:text-[#AEB5FF]">{member.role}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${member.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
            {member.status}
          </span>
        </div>
        <p className="mt-1 truncate text-sm text-slate-500 dark:text-[#AEB5FF]">
          {member.email} - Last assigned: {lastAssigned}
        </p>
      </div>

      {canToggle && (
        <button
          onClick={() => onToggle(member)}
          className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
            member.status === "ACTIVE" ? "border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-[#2D35D4]/50 dark:text-[#DDE2FF] dark:hover:bg-[#1A1F8C]" : "bg-[#2D35D4] text-white hover:bg-[#1A1F8C]"
          }`}
        >
          {member.status === "ACTIVE" ? "Mark OOF" : "Set active"}
        </button>
      )}
    </article>
  );
}
